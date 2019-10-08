MBB:0000 
0x00007fafa075c208:   90                               nop
0x00007fafa075c209:   b8 00 00 00 00                   mov    $0x0,%eax
MBB:0001 
0x00007fafa075c20e:   48 b9 f0 75 a4 00 00 00 00 00    movabs $0xa475f0,%rcx
0x00007fafa075c218:   48 8b 09                         mov    (%rcx),%rcx
0x00007fafa075c21b:   8b 49 10                         mov    0x10(%rcx),%ecx
0x00007fafa075c21e:   3b c1                            cmp    %ecx,%eax
0x00007fafa075c220:   0f 8d 39 00 00 00                jge    0x00007fafa075c25f
MBB:0002 
0x00007fafa075c226:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075c22b:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075c230:   8b f0                            mov    %eax,%esi
0x00007fafa075c232:   03 f2                            add    %edx,%esi
0x00007fafa075c234:   48 ba f0 75 a4 00 00 00 00 00    movabs $0xa475f0,%rdx
0x00007fafa075c23e:   48 8b 12                         mov    (%rdx),%rdx
0x00007fafa075c241:   8b 7a 10                         mov    0x10(%rdx),%edi
0x00007fafa075c244:   3b c7                            cmp    %edi,%eax
0x00007fafa075c246:   0f 82 08 00 00 00                jb     0x00007fafa075c254
0x00007fafa075c24c:   48 8b 04 25 02 00 00 00          mov    0x2,%rax
0x00007fafa075c254:   89 4c 82 18                      mov    %ecx,0x18(%rdx,%rax,4)
0x00007fafa075c258:   8b c6                            mov    %esi,%eax
0x00007fafa075c25a:   e9 af ff ff ff                   jmpq   0x00007fafa075c20e
MBB:0003 
0x00007fafa075c25f:   c3                               retq   
